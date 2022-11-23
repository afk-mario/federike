export async function getVerifyCredentails({ client }) {
  return client.get(`accounts/verify_credentials`);
}
