var regs=document.getElementById('registrujse');
var reguser;
var regpass;

function login() {
    var Username = document.getElementById('ime');
    var Password = document.getElementById('sifra');

    if ((Username.value === "harun" && Password.value === "123") || 
        (Username.value === reguser && Password.value === regpass)) {
        alert('Podaci su tačni!;Otvara se novi prozor!');
        window.location.href = "flappybird.html";
        
    } else if (Username.value === "" && Password.value === "") {
        alert("Login forma ne može biti prazna!");
    } else {
        alert("Username/Password su netačni");
    }
}
function regS()
{
    regs.style.visibility="visible";
}
function ok()
{
    reguser = document.getElementById('novoIme').value;
    regpass = document.getElementById('novaSifra').value;
    
    if(reguser!=null && regpass!=null)
    { document.getElementById('ime').value = reguser;
    document.getElementById('sifra').value = regpass;
    regs.style.visibility="hidden";
}else{
    alert("Login forma ne može biti prazna!");
}
   
}