import { base44 } from "@/api/base44Client";

// Every call to a backend function goes through invokeFunction. A function Base44 wrote but never deployed
// answers 404: the error then says so in words, and the HQ shows the one Base44 message that switches that
// function on (AIOffNotice in BuildTool.jsx).
export async function invokeFunction(name, payload) {
  try {
    return await base44.functions.invoke(name, payload);
  } catch (e) {
    if ((e?.status ?? e?.response?.status) !== 404) throw e;
    window.dispatchEvent(new CustomEvent("sf-ai-off", { detail: { name } }));
    const off = new Error(`Your AI isn't switched on yet: the ${name} backend function isn't deployed in Base44.`);
    off.functionName = name;
    throw off;
  }
}

// One helper for every AI call in the app. InvokeLLM is blocked in the browser,
// so this goes through the generateWithAI backend function.
export async function callAI({ prompt, response_json_schema }) {
  const response = await invokeFunction("generateWithAI", { prompt, response_json_schema });
  const data = response?.data ?? response;
  if (data && data.error) {
    throw new Error(data.error);
  }
  let result = data?.result;
  if (typeof result === "string") {
    try {
      result = JSON.parse(result);
    } catch (e) {
      // leave as a string if it isn't JSON
    }
  }
  return result;
}
