import { axios } from "@pipedream/platform";
import { buildTaskBody } from "./common/body.mjs";

export default {
  type: "app",
  app: "loopquest",
  propDefinitions: {
    content: { type: "string", label: "Content", description: "The output a human should review." },
    title: { type: "string", label: "Title", optional: true },
    module: {
      type: "string",
      label: "Module",
      optional: true,
      default: "swiper",
      options: ["swiper", "detective", "decoy", "arena"],
    },
    externalId: { type: "string", label: "External ID", optional: true, description: "Echoed back in the verdict webhook." },
    callbackUrl: { type: "string", label: "Callback URL", optional: true, description: "Where LoopQuest POSTs the signed verdict." },
    taskId: { type: "string", label: "Task ID" },
  },
  methods: {
    _baseUrl() {
      return (this.$auth.base_url || "https://loopquest.tomphillips.uk").replace(/\/+$/, "");
    },
    _headers() {
      return { authorization: `Bearer ${this.$auth.api_key}`, "content-type": "application/json" };
    },
    async createTask({ $, props }) {
      return axios($, {
        method: "POST",
        url: `${this._baseUrl()}/api/v1/tasks`,
        headers: this._headers(),
        data: buildTaskBody(props),
      });
    },
    async getTask({ $, taskId }) {
      return axios($, {
        method: "GET",
        url: `${this._baseUrl()}/api/v1/tasks/${taskId}`,
        headers: this._headers(),
      });
    },
  },
};
