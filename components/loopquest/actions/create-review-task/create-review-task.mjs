import app from "../../loopquest.app.mjs";

export default {
  key: "loopquest-create-review-task",
  name: "Create Review Task",
  description: "Send content to LoopQuest for a human to review (approve or flag). [See the docs](https://loopquest.tomphillips.uk/docs).",
  version: "0.0.1",
  type: "action",
  props: {
    loopquest: app,
    content: { propDefinition: [app, "content"] },
    title: { propDefinition: [app, "title"] },
    module: { propDefinition: [app, "module"] },
    externalId: { propDefinition: [app, "externalId"] },
    callbackUrl: { propDefinition: [app, "callbackUrl"] },
  },
  async run({ $ }) {
    const res = await this.loopquest.createTask({
      $,
      props: {
        content: this.content,
        title: this.title,
        module: this.module,
        externalId: this.externalId,
        callbackUrl: this.callbackUrl,
      },
    });
    $.export("$summary", `Submitted review task ${res.id}`);
    return res;
  },
};
