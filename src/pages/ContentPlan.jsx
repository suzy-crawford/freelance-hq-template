import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "@/components/brand/icons";
import { base44 } from "@/api/base44Client";
import { callAI } from "@/lib/callAI";
import { PageSkeleton } from "@/components/shared/Page";
import { displayName, buildStrategyCall, finalizeStrategy, buildPostsCall, finalizePosts, nextBatch } from "@/lib/libs";
import { ContentTrack, AboutStep, StrategyStep, ContentStep } from "@/components/content/ContentCreator";

const errText = (e) => e?.response?.data?.error || e?.message || String(e);

export default function ContentPlan() {
  const { planId } = useParams();
  const navigate = useNavigate();
  const [plan, setPlan] = useState(null);
  const [building, setBuilding] = useState(false);
  const [writing, setWriting] = useState(false);
  const [error, setError] = useState(null);
  const saveTimer = useRef(null);
  const pending = useRef({});

  useEffect(() => {
    base44.entities.ContentPlan.get(planId)
      .then(setPlan)
      .catch(() => navigate("/content", { replace: true }));
  }, [planId, navigate]);

  const flush = useCallback(async () => {
    const updates = pending.current;
    pending.current = {};
    if (!Object.keys(updates).length) return;
    try {
      await base44.entities.ContentPlan.update(planId, updates);
    } catch (e) {
      console.error("[Content] autosave", e);
    }
  }, [planId]);

  // Answers save a moment after she stops typing.
  const change = (updates) => {
    setPlan((prev) => ({ ...prev, ...updates }));
    pending.current = { ...pending.current, ...updates };
    clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(flush, 600);
  };
  useEffect(() => () => (clearTimeout(saveTimer.current), flush()), [flush]);

  const go = (stage) => {
    change({ stage });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 1 AI call: positioning, pillars, hooks, calendar.
  const buildPlan = async (note = "") => {
    clearTimeout(saveTimer.current);
    await flush();
    setBuilding(true);
    setError(null);
    setPlan((prev) => ({ ...prev, stage: "strategy" }));
    try {
      const strategy = finalizeStrategy(await callAI(buildStrategyCall(plan, typeof note === "string" ? note : "")), plan);
      if (!strategy.calendar.length) throw new Error("The plan came back empty. Try again.");
      const updated = await base44.entities.ContentPlan.update(plan.id, { strategy, posts: [], stage: "strategy" });
      setPlan(updated);
    } catch (e) {
      console.error("[Content] plan", e);
      setError(errText(e));
    } finally {
      setBuilding(false);
    }
  };

  // 1 AI call per 5 posts.
  const writeMore = async () => {
    const items = nextBatch(plan);
    if (!items.length) return go("content");
    setWriting(true);
    setError(null);
    setPlan((prev) => ({ ...prev, stage: "content" }));
    try {
      const fresh = finalizePosts(await callAI(buildPostsCall(plan, items)), items);
      const posts = [...(plan.posts || []), ...fresh].sort((a, b) => a.day - b.day);
      const updated = await base44.entities.ContentPlan.update(plan.id, { posts, stage: "content" });
      setPlan(updated);
    } catch (e) {
      console.error("[Content] posts", e);
      setError(errText(e));
    } finally {
      setWriting(false);
    }
  };

  // A redo inside the plan: save it, and clear posts for days whose plan changed.
  const saveStrategy = (strategy, changed = []) => {
    const posts = (plan.posts || []).filter((p) => !changed.includes(p.day));
    change({ strategy, posts });
  };

  const savePost = (post) => {
    const posts = (plan.posts || []).map((p) => (p.day === post.day ? post : p));
    change({ posts });
  };

  if (!plan) return <PageSkeleton />;
  const hasPosts = (plan.posts || []).length > 0;
  let stage = plan.stage || "about";
  if (stage === "content" && !hasPosts && !writing) stage = plan.strategy ? "strategy" : "about";
  if (stage === "strategy" && !plan.strategy && !building) stage = "about";
  const canGo = (id) => id === "about" || (id === "strategy" && !!plan.strategy) || (id === "content" && (plan.posts || []).length > 0);
  const name = displayName(plan.business_name);

  return (
    <div className="lp ab">
      <Link to="/content" className="lp-back">
        <ArrowLeft /> All content plans
      </Link>
      <header className="lp-head">
        <span className="lp-avatar">{(name || "?").charAt(0).toUpperCase()}</span>
        <div className="min-w-0 flex-1">
          <h1 className="lp-title">{name || "New content plan"}</h1>
          <div className="lp-sub">{[plan.location, "Content Creator", plan.business_source === "practice" ? "Practice business" : ""].filter(Boolean).join(" · ")}</div>
        </div>
        <ContentTrack stage={stage} canGo={canGo} onGo={go} />
      </header>
      <div className={stage === "about" ? "ab-solo" : "mb-wide"}>
        <div className="lp-main">
          {stage === "about" && <AboutStep plan={plan} onChange={change} onBuild={buildPlan} building={building} error={error} />}
          {stage === "strategy" && <StrategyStep plan={plan} building={building} writing={writing} error={error} onBack={() => go("about")} onWrite={() => ((plan.posts || []).length ? go("content") : writeMore())} onSaveStrategy={saveStrategy} onRedoAll={(note) => buildPlan(note)} />}
          {stage === "content" && <ContentStep plan={plan} writing={writing} error={error} onBack={() => go("strategy")} onWriteMore={writeMore} onSavePost={savePost} onDone={() => navigate("/content")} />}
        </div>
      </div>
    </div>
  );
}
