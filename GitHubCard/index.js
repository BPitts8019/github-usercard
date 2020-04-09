/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/
const getUserCards = (userLogin, getFollowers = false) => {
   axios
      .get(`https://api.github.com/users/${userLogin}`)
      .then(response => {
         const userCards = buildUserCard(response.data);
         console.log(userCards);

         document.querySelector(".cards").appendChild(userCards);

         if (getFollowers) {
            return axios.get(`https://api.github.com/users/${userLogin}/followers`);
         }

         return null;
      })
      .then(response => {
         if (response) {
            let followers = response.data.map(follower => follower.login);
            followers = followers.concat([
               "thisshouldError",
               "tetondan",
               "dustinmyers",
               "justsml",
               "luishrd",
               "bigknell"
            ]);

            followers.forEach(follower => {
               getUserCards(follower);
            });
         }
      })
      .catch(error => {
         console.log(`There was a problem getting ${userLogin}'s user data from GitHub!`);
         console.log(error);
      });
};
getUserCards("BPitts8019", true);

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/


/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

// const followersArray = [
//    "thisshouldError",
//    "cladams0203",
//    "tetondan",
//    "dustinmyers",
//    "justsml",
//    "luishrd",
//    "bigknell"
// ];
// followersArray.forEach(getUserCards);

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/
const buildUserCard = userData => {
   //create elements
   const card = buildElement("div", null, "card");
   const children = [
      buildElement("img", null, null, userData.avatar_url),
      buildCardInfo(userData)
   ];

   //attach children
   card.append(...children);

   //return completed component
   return card;
};
const buildCardInfo = userData => {
   //create elements
   const cardInfo = buildElement("div", null, "card-info");
   const children = [
      buildElement("h3", userData.name, "name"),
      buildElement("p", userData.login, "userName"),
      buildElement("p", `Location: ${userData.location}`),
      buildProfile(userData.html_url),
      buildElement("p", `Followers: ${userData.followers}`),
      buildElement("p", `Following: ${userData.following}`),
      buildElement(
         "p", 
         (userData.bio)? `Bio: ${userData.bio}` : "Wow! So much empty.", 
         (!userData.bio)? "sarcastic" : ""
      ),
   ];

   //attach children
   cardInfo.append(...children);

   //return completed component
   return cardInfo;
};
const buildProfile = (profileUrl) => {
   //create elements
   const profile = buildElement("p", "Profile: ");
   const link = buildElement("a", profileUrl, null, profileUrl);

   //attach children
   profile.appendChild(link);

   //return completed component
   return profile;
};
const buildElement = (tagName, content = null, className = null, url = null) => {
   // create element
   const tag = document.createElement(tagName);

   //add properties
   if (content) tag.textContent = content;
   if (className) tag.classList.add(className);
   if (url && tag.src !== undefined) tag.src = url;
   if (url && tag.href !== undefined) tag.href = url;

   //return element
   return tag;
};