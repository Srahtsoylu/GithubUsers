const APIurl = "https://api.github.com/users/";

const input = document.querySelector(".search");
const search = document.querySelector(".submit");
const card = document.querySelector(".card");
 
// API'den verileri çeken fonksiyon
async function getData(username) {
  try {
    const {data} = await axios(APIurl + username);
    getUser(data);
  } catch (error) {
    errorMsg("User not found");
  }
}
//Search butonuna basıldığında getData() fonksiyonunu çalıştırır.
search.addEventListener("click", (e) => {
    e.preventDefault();
    let user = input.value;
    if (user) {
        getData(user);
        input.value = "";
    }
})

//Çekilen verideki kullanıcı bilgilerine html kısmına ekleyen fonksiyon 
 function getUser(username){
    const p = username.bio ? `<p>${username.bio}</p>` : "";
    getRepos(username.login);
    card.innerHTML = `     <img class="userImage" src="${username.avatar_url}"alt="" />
      <div class="userName">
        <h1 class="text">${username.name || username.login}</h1>
        <small class="text">@${username.login}</small> <br />
        <small class="text">${username.location}</small>
      </div>
      <ul>
        <li>
          <i class="fa-solid fa-user-group follow"></i>${username.followers}
          <strong>Followers</strong>
        </li>
        <li>
          <i class="fa-solid fa-user-plus follow"></i>${username.following}
          <strong>Following</strong>
        </li>
        <li>
          <i class="fa-solid fa-bookmark follow"></i>${username.public_repos}
          <strong> Repository</strong>
        </li>
      </ul>`
      
 }

//Çekilen verideki repo kısmını html'e ekleyen fonksiyon
 async function getRepos(username) {
    let repoElement = document.createElement("div");
    repoElement.classList.add("repos");
    repoElement.id = "repos";
    try {
        const { data } = await axios(APIurl + username + "/repos");
        data.slice(0,3).forEach((repo) => {
            let a = document.createElement("a");
              a.id= "repo"
            a.href = repo.html_url;
            a.target = "_blank"
            a.innerHTML = `<i class="fa-solid fa-book-bookmark"></i>${repo.name}`;
          
            repoElement.appendChild(a);
            
        });
        card.appendChild(repoElement);
    } catch (error) {
        errorMsg("An error was encountered");
    } }

function errorMsg(text){
    card.innerHTML = `<p class="error_p">${text}</p>`
}