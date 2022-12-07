export function checkRegister(email, pass, repass, fullname, date, gender, role, accept)
{
    if (email == null)
    {
        return 0;
    }
    else if (pass == null)
    {
        return 1;
    }
    else if (repass == null)
    {
        return 2;
    }
    else if (fullname == null)
    {
        return 3;
    }
    else if (date.getFullYear() == null || date.getMonth() == null || date.getDate() == null)
    {
        return 4;
    }
    else if (gender == null)
    {
        return 5;
    }
    else if (role == null)
    {
        return 6;
    }
    else if (pass != repass)
    {
        return 7;
    }
    else if (accept == null)
    {
        return 8;
    }
    else
    {
        // truy vấn db để tìm email đã tồn tại
        return 9;
    }
    return -1;  
}

export function checkLog(email, pass, remember)
{
    if (email == null)
    {
        return 0;
    }
    else if (pass == null)
    {
        return 1;
    }
    else
    {
        // truy vấn db để tìm tài khoản đã có chưa, nếu chưa return
        return 2;
    }
    if (remember != null)
    {
        return -2;
    }
    return -1;  
}