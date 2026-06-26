/** Build the POST /api/v1/tasks body from action props. Pure — unit tested. */
export function buildTaskBody(p = {}) {
  const body = {
    module: p.module || "swiper",
    payload: { content: p.content },
    card: { title: p.title || "Review", body: p.content },
  };
  if (p.source) body.source = p.source;
  if (p.externalId) body.external_id = p.externalId;
  if (p.callbackUrl) body.callback_url = p.callbackUrl;
  if (p.reviewsRequired) body.reviews_required = p.reviewsRequired;
  return body;
}
