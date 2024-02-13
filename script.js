let backgroundImages = document.querySelector(".imageDisplay")
backgroundImages.style.backgroundImage = `url('Images/images (1).jpeg')`

let list= document.querySelector(".list")
console.log(sourceArray);
sourceArray.forEach((item,i) =>{
   console.log("list");
   list.innerHTML += `
      <div class="list">
         <div class ="elem">
            <div class="img"></div>
            <h3>${item}</h3>
         </div>
      </div>
   `
   console.log(list);
   console.log("list");
})