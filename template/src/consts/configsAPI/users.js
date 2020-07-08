export const apiCreate = () => ({
  pathname: "/users",
  data: {
    workspace: localStorage.getItem("workspace")
  },
  configs: {
    headers: {
      'Content-type': "multipart/form-data"
    }
  }
})