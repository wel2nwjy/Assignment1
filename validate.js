function validateFn(noVal,form_type)
{     
    var valtype="",flag=0;
    var vaidation=true,validemail=true,validtel=true,validpassword=true;
    var inpfields=[];
    inpfields=["Full Name","Email","Mobile No:","Username","Password","Repeat Password"]; 
    const test=form_type;

    for(let i=1;i<=noVal;i++)
    {   
        const val=document.getElementById("inputVal"+i);   
        valtype=val.type;

        if (val.value.trim()==="")
        { 
            vaidation=false;
            style_invalid(i,val,inpfields[i-1]);
        }
        else
        {
            style_valid(i,val);

                        if(valtype=="email")
                            {
                                validemail= email_validation(val.value);
                            }
                        else if(valtype=="tel")
                            {
                                validtel= ph_validation();
                            }
                        else if(valtype=="password"&&flag==0)
                            {
                                const n =i+1;
                                const val1=document.getElementById("inputVal"+n);

                                    if(val.value.trim()!="" && val1.value.trim()!="" && val.value!==val1.value)
                                    {
                                        validpassword=false;                                        
                                        style_password_invalid(i,val1);
                                        break;
                                    }
                                    else
                                    {
                                        style_valid(i,val); 
                                    }
                                 flag=1;
                            }
        }
    }   
    if(validemail==false||validtel==false||validpassword==false)
    {vaidation=false;}
 return vaidation;
}
// ...........................................Email Validation.............................................
function email_validation(inputValue){
    
    return false;
}

// ...........................................Phone Validation.............................................
function ph_validation(){
    return false;
}
// ...........................................Styling the HTML with Error Message.............................................
function style_valid(indexval,element)
{ 
    const msg=document.getElementById("errormsg"+indexval);
    msg.innerHTML = "";
    element.style.border="1px solid green"; 
}

function style_invalid(indexval,element,fieldname)
{   
        const msg=document.getElementById("errormsg"+indexval);
        msg.innerHTML = 'Enter '+ fieldname;
        msg.style.color="red";
        element.style.border="1px solid red"; 
}

function style_password_invalid(indexval,element)
{
    const nextval=indexval+1
    // console.log(indexval);
    // console.log(nextval);
    const msg=document.getElementById("errormsg"+indexval);
    const msgnxt=document.getElementById("errormsg"+nextval);
    msgnxt.innerHTML = "";
    msg.innerHTML = "The Passwords don't match.Try Again "; 
    msg.style.color="red";
    element.style.border="1px solid red"; 
}


   