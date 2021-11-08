function validateFn(noVal,formtype)
{ 
    
    var valtype="";
    var vaidation=true;
    var inpfields=[];
    // var demostr="";
    
    inpfields=["Full Name","Email","Mobile No:","Username","Password","Repeat Password"]; 

    // If(formtype === "signupfm")
    // {
    //     inpfields=["Full Name","Email","Mobile No:","Username","Password","Repeat Password"]; 
    // } 
    // else
    // {
    //     inpfields=["Username","Password"]; errormsg6
    // }

    for(let i=1;i<=noVal;i++)
    {   
        const val=document.getElementById("inputVal"+i);
        
        valtype=val.type;
        const msg=document.getElementById("errormsg"+i);

        if (val.value.trim()==="")
        {
            msg.innerHTML = 'Enter '+inpfields[i-1];
            msg.style.color="red";
            val.style.border="1px solid red";
            vaidation=false;
        }
        else
        {
            msg.innerHTML = "";
            val.style.border="1px solid green";

                        if(valtype=="email")
                            {
                                // return email_validation();
                            }
                        else if(valtype=="tel")
                            {
                                // return ph_validation();
                            }
                        else
                            {

                            }
        }
    } 

   return vaidation

}


function email_validation(){
    return false
}

function ph_validation(){
    return false
}

   