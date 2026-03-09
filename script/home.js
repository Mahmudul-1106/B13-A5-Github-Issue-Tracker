
function showSpinner(){
    document.getElementById('issue-count-container').classList.add('hidden');
    document.getElementById('issue-container').classList.add('hidden');

    document.getElementById('spinner').classList.remove('hidden');
}

function hideSpinner(){
    document.getElementById('issue-count-container').classList.remove('hidden');
    document.getElementById('issue-container').classList.remove('hidden');

    document.getElementById('spinner').classList.add('hidden');
}

async function issueLoad(){
    showSpinner();
    const url = await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues');
    const res = await url.json();
    displayIssue(res.data);
}


function displayIssue(issues){
    const issueContainer = document.getElementById('issue-container');
    issueContainer.innerHTML = '';


    issues.forEach(issue => {
        // console.log(issue);
        let date = new Date(issue.createdAt).toLocaleString();
        const div = document.createElement('div');
        div.onclick = () => {
             modal(issue); 
        };
        div.className = `bg-[#FBFBFB] p-4 rounded-xl space-y-3 shadow-xl border-t-4 ${issue.status === 'open' ? `border-[#00A96E]`: `border-[#A855F7]`} ` 
        div.innerHTML = `
        <div class="flex justify-between items-center ">

                    ${issue.status === 'open' ?
                        `<img src="./assets/Open-Status.png" alt="">` : 
                        `<img src="./assets/closed-status.png" alt="">`
                    }
                    
                        ${issue.priority === "high" ? 
                            `<p class="px-5 py-1 rounded-full text-[12px] bg-[#FEECEC] text-[#F04545]">HIGH</p>`: 
                            `${issue.priority === "medium" ?
                                 '<p class="px-5 py-1 rounded-full text-[12px] bg-[#FFF6D1] text-[#F59E0B]">Medium</p>' :
                                 '<p class="px-5 py-1 rounded-full text-[12px] bg-[#EEEFF2] text-[#9CA3AF]">Low</p>'} `                         
                        } 
                   
                </div>
                <div>
                    <h3 class="font-semibold text-[14px] line-clamp-1">${issue.title}</h3>
                    <p class="text-[12px] text-[#64748B] line-clamp-2">${issue.description}</p>
                </div>
                <div class="flex items-center gap-2 py-3">


                ${issue.labels.map(label => {
                    if(label=== 'bug'){
                       return `<p class="flex items-center px-3 py-1 rounded-full text-[12px] bg-[#FEECEC] text-[#F04545] border-2 border-[#FECACA]">
                        <i class="fa-solid fa-bug"></i> BUG </p>`
                    }

                    if(label=== 'help wanted'){
                       return `<p class="flex items-center px-3 py-1 rounded-full text-[12px] bg-[#FFF8DB] border-2 border-[#FDE68A] text-[#F04545]">
                        <i class="fa-regular fa-life-ring"></i> help wanted </p>`
                    }

                    if(label=== 'enhancement'){
                       return `<p class="flex items-center px-3 py-1 rounded-full text-[12px] bg-[#DEFCE8] border-2 border-[#BBF7D0] text-[#00A96E]">
                        <i class="fa-regular fa-life-ring"></i> Enhancement </p>`
                    }

                    if(label=== 'good first issue'){
                       return `<p class="flex items-center px-3 py-1 rounded-full text-[12px] bg-[#DEFCE8] border-2 border-[#BBF7D0] text-[#00A96E]">
                         Good First Issue</p>`
                    }

                    else{
                        return `<p class="flex items-center px-3 py-1 rounded-full text-[12px] bg-[#DEFCE8] border-2 border-[#BBF7D0] text-[#00A96E]"><i class="fa-regular fa-life-ring"></i>
                         ${label}
                    </p>`
                    }
                } ).join("")
            }
                    
                </div>
                <div class="border-t-2 border-[#E4E4E7] space-y-1 py-3">
                    <p class="text-[12px] text-[#64748B]"> by ${issue.author} </p>
                    <p class="text-[12px] text-[#64748B]">${date}</p>
                </div>
    `
        issueContainer.appendChild(div);

    });

    let totalIssue = issueContainer.children.length;
   let issueCount = document.getElementById('issue-count');
   issueCount.innerText = totalIssue;
   hideSpinner();
    
}

function displayCondition(id){
    showSpinner();
    let newIssue = [];
     fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
     .then(res => res.json())
     .then(data => newDisplay(data.data))

     function newDisplay(data){
        
        if(id === 'btn-open'){
            // Activatio of Button
            const btnList = document.querySelectorAll('#btn-section button');
            btnList.forEach(btn => {
                btn.classList.add('btn-soft');
            })
            document.getElementById(`${id}`).classList.remove('btn-soft');


        data.forEach(issue => {
        if(issue.status === 'open'){
            newIssue.push(issue);
        }
    }) 
    displayIssue(newIssue);
    }

    if(id === 'btn-closed'){
        // Activation of Button
        const btnList = document.querySelectorAll('#btn-section button');
            btnList.forEach(btn => {
                btn.classList.add('btn-soft');
            })
            document.getElementById(`${id}`).classList.remove('btn-soft');

        data.forEach(issue =>{
            if(issue.status === 'closed'){
                newIssue.push(issue);
            }
        })

        displayIssue(newIssue);
        }

    if(id === 'btn-all'){
        // Activation of Button
        const btnList = document.querySelectorAll('#btn-section button');
            btnList.forEach(btn => {
                btn.classList.add('btn-soft');
            })
            document.getElementById(`${id}`).classList.remove('btn-soft');

        issueLoad();
    }

}
}

function modal(issue){
    const myModal = document.getElementById('my_modal');
    let date = new Date(issue.createdAt).toLocaleDateString();
    myModal.innerHTML = '';
    const div = document.createElement('div');
    div.innerHTML = `
        <div class="modal-box ">
            <h3 class="text-lg font-bold">${issue.title}</h3>
            <div class="flex items-center space-x-2 ">

                ${issue.status === 'open' ?
                        `<p class="flex items-center px-3 py-1 rounded-full text-[12px] bg-[#00A96E] border-2  text-[#FFF]">
                        <i class="fa-regular fa-life-ring"></i> Open </p>` : 
                        `<p class="flex items-center px-3 py-1 rounded-full text-[12px] bg-[#A855F7] border-2  text-[#FFF]">
                        <i class="fa-regular fa-life-ring"></i> Closed </p>`
                    }
                 <img src="./assets/circle.png" alt="">
                <p class="flex items-center text-[#64748B]">Open By ${issue.author}</p> 
                <img src="./assets/circle.png" alt="">
                <p class='text-[#64748B]'>${date}</p>
            </div>
             <div class="flex items-center gap-2 pt-5">


                ${issue.labels.map(label => {
                    if(label=== 'bug'){
                       return `<p class="flex items-center px-3 py-1 rounded-full text-[12px] bg-[#FEECEC] text-[#F04545] border-2 border-[#FECACA]">
                        <i class="fa-solid fa-bug"></i> BUG </p>`
                    }

                    if(label=== 'help wanted'){
                       return `<p class="flex items-center px-3 py-1 rounded-full text-[12px] bg-[#FFF8DB] border-2 border-[#FDE68A] text-[#F04545]">
                        <i class="fa-regular fa-life-ring"></i> help wanted </p>`
                    }

                    if(label=== 'enhancement'){
                       return `<p class="flex items-center flex items-center px-3 py-1 rounded-full text-[12px] bg-[#DEFCE8] border-2 border-[#BBF7D0] text-[#00A96E]">
                        <i class="fa-regular fa-life-ring"></i> Enhancement </p>`
                    }

                    if(label=== 'good first issue'){
                       return `<p class="flex items-center px-3 py-1 rounded-full text-[12px] bg-[#DEFCE8] border-2 border-[#BBF7D0] text-[#00A96E]"><i class="fa-regular fa-life-ring"></i>
                         Good First Issue</p>`
                    }

                    else{
                        return `<p class="flex items-center px-3 py-1 rounded-full text-[12px] bg-[#DEFCE8] border-2 border-[#BBF7D0] text-[#00A96E]"><i class="fa-regular fa-life-ring"></i>
                         ${label}
                    </p>`
                    }
                } ).join("")
            }
                    
                </div>
            <div class="py-4">
                <p class="text-[16px] text-[#64748B] ">${issue.description}</p>
            </div>
            <div class="bg-[#F8FAFC] p-4 flex justify-between items-center rounded-lg">
                <div class="flex-1">
                    <p class="text-[#64748B]">Assignee:</p>
                    <p class="text-[16px] font-semibold">${issue.assignee ? `${issue.assignee}`: `Not Assigned`}</p>
                </div>
                <div class="flex-1">
                    <p class="text-[#64748B]">Priority:</p>
                    ${issue.priority === "high" ? 
                            `<p class="px-5 py-1 rounded-full w-[100px] text-center text-[12px] bg-[#FEECEC] text-[#F04545]">HIGH</p>`: 
                            `${issue.priority === "medium" ?
                                 '<p class="px-5 py-1 rounded-full w-[100px] text-center text-[12px] bg-[#FFF6D1] text-[#F59E0B]">Medium</p>' :
                                 '<p class="px-5 py-1 rounded-full w-[100px] text-center text-[12px] bg-[#EEEFF2] text-[#9CA3AF]">Low</p>'} `                         
                        }
                </div>

            </div>
            <p class="pt-4">Press ESC key or click the button below to close</p>
            <div class="modal-action">
                <form method="dialog">
                    <!-- if there is a button in form, it will close the modal -->
                    <button class="btn">Close</button>
                </form>
            </div>
        </div>
    `
    myModal.appendChild(div);
    myModal.showModal();
}

// search function
document.getElementById('btn-search').addEventListener('click', function(){
    const search = document.getElementById('search');
    const searchValue = search.value;
    showSpinner();
    fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchValue}`) 
    .then(res => res.json())
    .then(data => displayIssue(data.data))

    
    search.value = "";
    const btnList = document.querySelectorAll('#btn-section button');
    btnList.forEach(btn => btn.classList.add('btn-soft'));
  })

function logout(){
    window.location.replace('./index.html');
}

issueLoad();