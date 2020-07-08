import { decodeJWT } from "utils"

export default () => {
  const payload = decodeJWT(localStorage.getItem("accessToken"));
  
}