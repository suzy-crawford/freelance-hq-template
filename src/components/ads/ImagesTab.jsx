import React from "react";
import CopyButton from "@/components/shared/CopyButton";
import { ExternalLink } from "@/components/brand/icons";
import { getAds } from "@/lib/adsCards";
import { buildImagePrompt } from "@/lib/adsClaudePrompts";
import { getNiche } from "@/lib/adsNiches";
import { nicheCreative, getCreativeType, CREATIVE_TYPES } from "@/lib/adsCreative";

// Creative: the niche's creative direction, then what to shoot for each ad. Real footage first;
// ChatGPT only as a stand-in when the business has no photo.
export default function ImagesTab({ campaign }) {
  const ads = getAds(campaign);
  const niche = getNiche(campaign);
  const guide = nicheCreative(niche.id);
  const videos = ads.filter((a) => a.video);

  return (
    <>
      <section className="doc-section">
        <h3>Your creative</h3>
        <p className="intro">{guide ? guide.direction : "Real photos and video of the business beat stock every time. Each ad below says what to shoot."}</p>
        {guide && (
          <dl className="defs">
            <div>
              <dt>What to prioritize</dt>
              <dd>
                <ul className="list-disc pl-5 space-y-1">
                  {guide.prioritize.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              </dd>
            </div>
            <div>
              <dt>Example</dt>
              <dd>{guide.example}</dd>
            </div>
            <div>
              <dt>Avoid</dt>
              <dd>{guide.avoid}</dd>
            </div>
            {guide.compliance && (
              <div>
                <dt>Compliance</dt>
                <dd>{guide.compliance}</dd>
              </div>
            )}
          </dl>
        )}
        {!guide && (
          <dl className="defs">
            {CREATIVE_TYPES.map((c) => (
              <div key={c.id}>
                <dt>{c.name}</dt>
                <dd>
                  {c.communicates}
                  <span className="why">{c.format}</span>
                </dd>
              </div>
            ))}
          </dl>
        )}
      </section>

      {ads.map((ad) => {
        const type = getCreativeType(ad.image?.creative_type);
        const shots = ad.image?.shots || [];
        return (
          <section key={ad.index} className="doc-section">
            <div className="tool-label">Creative for ad {ad.index + 1}</div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 mb-2">
              <h3 className="m-0">{ad.name}</h3>
              {type && <span className="tag tag-lav">{type.name[0].toUpperCase() + type.name.slice(1)}</span>}
            </div>
            <dl className="defs">
              {ad.format && (
                <div>
                  <dt>Format</dt>
                  <dd>
                    <strong>{ad.format}</strong>
                  </dd>
                </div>
              )}
              <div>
                <dt>The creative</dt>
                <dd>{ad.image?.visual}</dd>
              </div>
              {shots.length > 0 && (
                <div>
                  <dt>What to shoot</dt>
                  <dd>
                    <ul className="list-disc pl-5 space-y-1">
                      {shots.map((s, i) => (
                        <li key={i}>{s}</li>
                      ))}
                    </ul>
                  </dd>
                </div>
              )}
              {ad.image?.overlay && (
                <div>
                  <dt>Text on it</dt>
                  <dd>{ad.image.overlay}</dd>
                </div>
              )}
              <div>
                <dt>No photo yet?</dt>
                <dd>
                  Use ChatGPT to make a stand-in image until they can shoot the real thing.
                  <div className="flex flex-wrap gap-2 mt-2">
                    <CopyButton text={buildImagePrompt(campaign, ad)} label="Copy for ChatGPT" />
                    <a className="btn btn-quiet inline-flex items-center gap-1" style={{ height: 36, fontSize: 13 }} href="https://chatgpt.com" target="_blank" rel="noreferrer">
                      Open ChatGPT
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </dd>
              </div>
            </dl>
          </section>
        );
      })}

      {videos.length > 0 && (
        <section className="doc-section">
          <h3>Short videos (Reels)</h3>
          <p className="intro">A short phone video often does well next to the images. The business films it, no editing skills needed.</p>
          <dl className="defs">
            {videos.map((ad) => (
              <div key={ad.index}>
                <dt>{ad.video.title}</dt>
                <dd>
                  <span className="whitespace-pre-line">{ad.video.script}</span>
                  <div className="mt-2">
                    <CopyButton text={`${ad.video.title}\n${ad.video.script}`} />
                  </div>
                </dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      <section className="doc-section">
        <h3>Before you build: check your mix</h3>
        <ul className="space-y-1.5 text-app-text">
          <li>[ ] One image or video for each of the {ads.length} ads</li>
          <li>[ ] Each ad looks different from the others at a glance</li>
          <li>[ ] Real photos or footage of the business, their team or their work</li>
          <li>[ ] A short video, if they can film one</li>
        </ul>
      </section>
    </>
  );
}
