import axios from "axios";

const getFruit = async function (fruit) {
  return await axios
    .get(`https://api.calorieninjas.com/v1/nutrition?query=${fruit}`, {
      headers: { "X-Api-Key": "jgglQftAE0+iD8JuXpn5tA==6bm5ahKJXO01pJni" },
    })
    .then((res) => {
      if (res.data.items[0]) {
        return res.data.items[0];
      } else {
        alert("Sorry, we don't have info about this one yet.. :(");
      }
    })
    .catch((err) => {
      alert(err);
      return;
    });
};

export { getFruit };
