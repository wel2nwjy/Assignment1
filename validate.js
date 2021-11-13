function validateFn(noVal,form_type)
{     
    var valtype="",flag=0;
    var vaidation=true,validemail=true,validtel=true,validpassword=true,validbothpassword=true;
    var inpfields=[];
    if (form_type === "signupfm") {
        inpfields=["Full Name","Email","Mobile No:","Username","Password","Repeat Password"];
        hide_progressbar(true);
    } else {
        inpfields=["Username","Password"];
    }

    for(let i=1;i<=noVal;i++)
    {   
        const val=document.getElementById("inputVal"+i);   
        valtype=val.type;

        if (val.value.trim()===""){ 
            vaidation=false;
            style_invalid(i,val,inpfields[i-1],1);
        }
        else{style_valid(i,val);

            if(valtype=="email"){
                    validemail= email_validation(val.value);
                    if(validemail==false){
                        style_invalid(i,val,"Invalid Email",2);
                    }                                
                }
            else if(valtype=="tel"){                                
                    validtel= ph_validation(val.value);
                    if(validtel==false){
                        style_invalid(i,val,"Invalid Mobile No.",2);
                    }
                }
            else if(valtype=="password" && flag==0 && form_type === "signupfm"){
                    validpassword=pwd_validation(val);

                    if(validpassword==true){
                        const n =i+1;
                        const val1=document.getElementById("inputVal"+n);

                        if(val1.value.trim()!="")
                        {
                            if(val.value!==val1.value){
                                validbothpassword=false;                                        
                                style_password_invalid(i,val1);
                                break;
                            }else{
                                style_valid(i,val); 
                            }                            
                        }                          
                    }
                    flag=1;
                }
        }
    }   
    if(validemail==false||validtel==false||validpassword==false||validbothpassword==false)   {vaidation=false;}
 return vaidation;
}
// ...........................................Email Validation.............................................
function email_validation(inputValue){
    let regexp=/^([A-Za-z0-9_\.-]+)@([A-Za-z0-9\-]+).([a-z]{2,3})(.a-z{2,3})?$/;
    let valid=regexp.test(inputValue);
    return valid;
}
// ...........................................Phone Validation.............................................
function ph_validation(inputValue){
    let regExpMobile = /^(\d{3})(\.|\-|\s)(\d{3})(\.|\-|\s)(\d{4})$/;
    let valid=regExpMobile.test(inputValue);
    return valid;
}
// ...........................................Password Validation.............................................
function pwd_validation(pwdelement){
    let regexpcondt1=/[A-Z]/;
    let regexpcondt2=/[a-z]/;
    let regexpcondt3=/\d/;
    const err=document.getElementById("errormsg5");
    var invalidMsg="",valid=true;
    const pwd_value=pwdelement.value;   

    if(pwd_value.length<8){
        invalidMsg="Min 8 characters";
    }
    if(regexpcondt1.test(pwd_value)==false){
        if(invalidMsg!=""){invalidMsg+=","}else{"Must contain "};
        invalidMsg +="one uppercase"
    }
    if(regexpcondt2.test(pwd_value)==false){
        if(invalidMsg!=""){invalidMsg+=","}else{"Must contain "};
        invalidMsg +="one lowercase "
    }
    if(regexpcondt3.test(pwd_value)==false){
        if(invalidMsg!=""){invalidMsg+=" and "};
        invalidMsg +="digits also "
    }

    if(invalidMsg!=""){
        invalidMsg +="."
        valid=false;
        err.color="red";
        err.innerHTML=invalidMsg;        
        console.log(err);
        pwdelement.style.border="1px solid red"; 
    }

    return valid;
}
// ...........................................Styling the HTML with Error Message.............................................
function style_valid(indexval,element){ 
    const msg=document.getElementById("errormsg"+indexval);
    msg.innerHTML = "";
    element.style.border="1px solid green"; 
}

function style_invalid(indexval,element,fieldname,stype){   
        const msg=document.getElementById("errormsg"+indexval);
        msg.style.color="red";
        element.style.border="1px solid red"; 
          if(stype==1){
              msg.innerHTML = 'Enter '+ fieldname;
          }else{
              msg.innerHTML = fieldname; 
          }
}

function style_password_invalid(indexval,element){
    const nextval=indexval+1
    const msg=document.getElementById("errormsg"+indexval);
    const msgnxt=document.getElementById("errormsg"+nextval);
    msgnxt.innerHTML = "";
    msg.innerHTML = "The Passwords don't match.Try Again "; 
    msg.style.color="red";
    element.style.border="1px solid red"; 
}

// ........................................... Password strength.............................................
function password_strength(){
    let regexpcondt1=/[A-Z]/;
    let regexpcondt2=/[a-z]/;
    let regexpcondt3=/\d/;
    let regexpcondt4=/[^A-Za-z0-9]/;
    var validval=true;
    let pwd_strength=0;
    
    const inp_password = document.getElementById("inputVal5");
    const err_msg = document.getElementById("errormsg5");
    err_msg.innerHTML = '';
    hide_progressbar(false);
    if(inp_password.value.length>=8) {            
            pwd_strength++;

            validval=regexpcondt1.test(inp_password.value);               
              if(validval==true){
                pwd_strength++; 
              }
            validval=regexpcondt2.test(inp_password.value);               
              if(validval==true){
                pwd_strength++; 
              }
            validval=regexpcondt3.test(inp_password.value);               
              if(validval==true){
                pwd_strength++; 
              }
              validval=regexpcondt4.test(inp_password.value);               
              if(validval==true){
                pwd_strength++; 
              }
              sty_strength_pwd(pwd_strength);
        }else if(inp_password.value.length>=1 && inp_password.value.length<8){            
            sty_weak_pwd(inp_password.value.length);   
        }else{
            hide_progressbar(true);
        }
}
// ...........................................Styling Password Progress Bar.............................................

function sty_strength_pwd(nValstrength){

    if(nValstrength>3){
        if(nValstrength==5){
            sty_progress_bar("100%","#B2EA70","Very Strong");  
        }else{
            sty_progress_bar("80%","#B2EA70","Strong");  
        }        
    }else if(nValstrength==3){
        sty_progress_bar("60%","#FFAB4C","Medium"); 
    }else{
        sty_progress_bar("40%","#B91646","Weak"); 
    }
}

function sty_weak_pwd(nLength){
    const progressbarelement = document.getElementById("pwdstrength");
    
    if(nLength==3){
        sty_progress_bar("11%","#B91646","Weak"); 
    }else if(nLength==4 || nLength==5 ){
        sty_progress_bar("22%","#B91646","Weak"); 
    }else if(nLength>5 && nLength<8){
        sty_progress_bar("33%","#B91646","Weak"); 
    }
}

function hide_progressbar(bvisible){
    const progresslement = document.getElementById("pgss");
    const pwd_caption = document.getElementById("pwdtext");
   
    if(bvisible==false){
        progresslement.style.visibility="visible";
        sty_progress_bar("5%","#B91646","Very Weak"); 
    }else{
        pwd_caption.innerHTML="";
        progresslement.style.visibility="hidden";
    }
}

function sty_progress_bar(stywidth,stycolor,caption){
    const progressbarelement = document.getElementById("pwdstrength");
    const pwd_caption = document.getElementById("pwdtext");
    progressbarelement.style.width=stywidth;
    progressbarelement.style.backgroundColor=stycolor;
    pwd_caption.style.backgroundColor=stycolor;
    pwd_caption.innerHTML=caption;
}

// ...........................................Show Password ........................................................
function showpassword(inppwdid,togglepwdid){
    const passwordelement = document.querySelector("#"+inppwdid); 
    const togglePassword = document.querySelector("#"+togglepwdid);
    
    passwordelement.type = "text";
    togglePassword.innerHTML="Show"; 

        setTimeout(function(){ 
            passwordelement.type = "password";
            togglePassword.innerHTML="Hide"; 
         }, 1000);

}