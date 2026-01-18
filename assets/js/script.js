// ---------------- Courses toggle ----------------
function toggleCourse(el){
    const content = el.nextElementSibling;
    content.style.display = content.style.display === "block" ? "none" : "block";
}
function markComplete(btn){
    btn.textContent = "Completed ✅";
    updateProgress();
}
function updateProgress(){
    const total = document.querySelectorAll(".course").length;
    const completed = document.querySelectorAll(".course-content button:contains('Completed')").length;
    const percent = Math.round((completed/total)*100);
    const bar = document.getElementById("progress-bar");
    bar.style.width = percent+"%";
    bar.textContent = percent+"%";
}

// ---------------- Notes toggle ----------------
function toggleNote(el){
    const content = el.nextElementSibling;
    content.style.display = content.style.display === "block" ? "none" : "block";
}

// ---------------- Playground ----------------
function runPlayground(){
    const html = document.getElementById("html-code").value;
    const css = "<style>"+document.getElementById("css-code").value+"</style>";
    const js = "<script>"+document.getElementById("js-code").value+"<\/script>";
    const output = document.getElementById("live-output").contentWindow.document;
    output.open();
    output.write(html + css + js);
    output.close();
}
function clearPlayground(){
    document.getElementById("html-code").value = "";
    document.getElementById("css-code").value = "";
    document.getElementById("js-code").value = "";
    const output = document.getElementById("live-output").contentWindow.document;
    output.open();
    output.write("");
    output.close();
}

// ---------------- PHP Playground ----------------
function runPHPCode(){
    const code = document.getElementById("php-code").value;
    fetch("assets/php/run.php", {
        method:"POST",
        headers:{"Content-Type":"application/x-www-form-urlencoded"},
        body:"code="+encodeURIComponent(code)
    })
    .then(res=>res.text())
    .then(data=>document.getElementById("php-output").textContent=data);
}

// ---------------- Python Playground ----------------
async function runPython(){
    const pyodide = await loadPyodide();
    const code = document.getElementById("python-code").value;
    try{
        const output = await pyodide.runPythonAsync(code);
        document.getElementById("python-output").textContent=output!==undefined?output:"Executed";
    }catch(err){
        document.getElementById("python-output").textContent=err;
    }
}

// ---------------- Contact form ----------------
const contactForm = document.getElementById("contact-form");
const responseDiv = document.getElementById("contact-response");

contactForm.addEventListener("submit", async (e)=>{
    e.preventDefault();
    const formData = new FormData(contactForm);
    const response = await fetch(contactForm.action, {
        method:"POST",
        body:formData
    });
    const text = await response.text();

    if(text.includes("✅")){
        responseDiv.textContent = text;
        responseDiv.className = "success";
        contactForm.reset();
    }else{
        responseDiv.textContent = text;
        responseDiv.className = "error";
    }

    setTimeout(()=>{
        responseDiv.className = "";
        responseDiv.textContent = "";
    },4000);
});
