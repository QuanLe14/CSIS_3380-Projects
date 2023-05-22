const url = "https://randomuser.me/api/?results=53";

async function getAPI(url){
    try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    show(data);
    } catch(error) {
        console.error("Error fetching API data: ", error);
    }
}

function show(data){
    const userData = document.getElementById("users");
    const pagination = document.getElementById("pagination");

    const fixedUsers = 2;
    const usersPerPage = 8;
    const totalPages = Math.ceil((data.results.length - fixedUsers) / usersPerPage);
    let currentPage = 1;
    
    function renderuserData(page){
        const startIndex = (page - 1) * usersPerPage;
        const endIndex = Math.min(startIndex + usersPerPage, data.results.length - fixedUsers);

        userData.innerHTML = "";
        for (let i = startIndex; i < endIndex; i++){
            const user = data.results[i + fixedUsers];
            const userElement = document.createElement("li");
            userElement.classList.add("contact-item", "cf");
            userElement.innerHTML = `
            <div class="contact-details">
            <img class="avatar" src="${user.picture.medium}">
            <h3>${user.name.first} ${user.name.last}</h3>
            <span class="email">${user.email}</span>
            </div>
            <div class="joined-details">
            <span class="date">Joined ${formattedDate(user.registered.date)}</span>
            </div>
            `;
            userData.appendChild(userElement);
        }
    }

    function renderPagination(){
        pagination.innerHTML = "";
        for (let i = 1; i <= totalPages; i++){
            const button = document.createElement("li");
            const link = document.createElement("a");
            link.href = "#";
            link.innerText = i;
            button.appendChild(link);
            button.addEventListener("click", () => {
                currentPage = i;
                renderuserData(currentPage);
            });
            pagination.appendChild(button);
        }
    }
    function formattedDate(dateString){
        const date = new Date(dateString);
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDay()).padStart(2, "0");
        const year = String(date.getFullYear()).slice(-2);
        return `${month}/${day}/${year}`;
    }
    //<ChatGPT May 12 Version https://chat.openai.com/> 
    //I struggled quite a bit with the date because in the API provided, there were no formatted structure with the date and there were other numbers, letters that comes after it.
    
    renderuserData(currentPage);
    renderPagination();
}
getAPI(url);