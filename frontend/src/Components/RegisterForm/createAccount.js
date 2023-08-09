import axios from "axios";

async function createAccount(data) {
  console.log("yes")
  console.log(data);
  await axios({
    method: "post",
    url: "http://127.0.0.1:8000/api/account-create/",
    data: data,
  })
    .then(function (response) {
      console.log(response.data);
      return { status: 200, message: "帳號創建成功" };
    })
    .catch(function (err) {
      console.log(err);
      return { status: 400, message: "帳號創建錯誤" };
    });
  let status = await new Promise((resolve, reject) => {
    setTimeout(function () {
      console.log(data)
      resolve(true);
    }, 3000);
  });
  return status;
}

export { createAccount };
