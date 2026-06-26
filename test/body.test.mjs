import { test } from "node:test";
import assert from "node:assert/strict";
import { buildTaskBody } from "../components/loopquest/common/body.mjs";

test("buildTaskBody wraps content and maps correlation fields", () => {
  const body = buildTaskBody({
    content: "ship it?",
    title: "Deploy gate",
    module: "detective",
    externalId: "run-9",
    callbackUrl: "https://x.test/hook",
  });
  assert.equal(body.module, "detective");
  assert.deepEqual(body.payload, { content: "ship it?" });
  assert.deepEqual(body.card, { title: "Deploy gate", body: "ship it?" });
  assert.equal(body.external_id, "run-9");
  assert.equal(body.callback_url, "https://x.test/hook");
});

test("buildTaskBody defaults module and omits unset fields", () => {
  const body = buildTaskBody({ content: "hi" });
  assert.equal(body.module, "swiper");
  assert.equal("external_id" in body, false);
  assert.equal("source" in body, false);
});
