type cbool = 0 | 1 | true | false;

interface OutputObject<T>{
    yes: T[];
    no: T[];
}

function setaccio <T> (a: T[] ,f: (val : T ) => cbool ):OutputObject<T> {
    let MyOtpObj : OutputObject<T> = {
        yes : [],
        no : []
    }
    
    for(let i = 0; i < a.length; i++) {
        let res:cbool = f(a[i]);
        
        if(res){
            MyOtpObj["yes"].push(a[i])
        }
        else MyOtpObj["no"].push(a[i])
    }

    return MyOtpObj
}