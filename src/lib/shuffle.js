const charset = `abcdefghijklmnopqrstuvwxyz`;

export function stringGen(len) {
  let text = "";

  for (let i = 0; i < len; i += 1) {
    text += charset.charAt(Math.floor(Math.random() * charset.length));
  }

  return text;
}

export function shuffleText(str) {
  return str
    .split("")
    .sort(() => 0.5 - Math.random())
    .join("");
}

export function randomAcct(str) {
  const [user, domain = []] = str.split("@");

  return `${stringGen(user.length)}${domain.length > 0 ? "@" : ""}${stringGen(
    domain.length
  )}`;
}
