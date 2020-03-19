import GoTrue from "gotrue-js"
const auth = new GoTrue({
  APIUrl: "https://devndesignatoneims.netlify.com/.netlify/identity",
  audience: "",
  setCookie: true,
})

export default auth
