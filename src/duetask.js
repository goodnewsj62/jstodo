
export function checkForDue(data){
    for(let day in data["todo"]){
        data["todo"][day].forEach(function(each){
            const now = new Date();
            const due = new Date(each.due);

            //if current time is greater or equal to due time
            //grab cards and look for which card task and due
            //matches each.task and each.due and add a due tag
            if(due.toISOString() <= now.toISOString()){
                const cards = document.querySelectorAll(".card");
                for(let card of cards){
                    const newDiv = document.createElement("div");
                    const dateDiv = card.querySelector(".date");
                    newDiv.setAttribute("class","indicateDue");
                    newDiv.innerHTML = "due";

                    const cardTask = card.querySelector('.card-header').innerHTML;
                    let carddue = card.querySelector('.date-created').innerHTML;
                    // carddue = /(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}):\d{2}\.\d+Z$/.exec(carddue)[1];

                    console.log(each.due);
                    
                    const getIndicator = card.querySelector(".indicateDue");
                    if(getIndicator === null){
                        if(cardTask == each.task && carddue === each.due){
                            dateDiv.appendChild(newDiv);
                        }
                    }

                }

            }
            
        });
    }
}