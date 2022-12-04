export function messageRegister(type) {
    var noti = ""
    var check = false
    switch (type) {
        case 0:
          noti = "Vui lòng điền email";
          break;
        case 1:
          noti = "Vui lòng điền mật khẩu";
          break;
        case 2:
          noti = "Vui lòng điền xác nhận mật khẩu";
          break;
        case 3:
          noti = "Vui lòng nhập họ tên đầy đủ";
          break;
        case 4:
          noti = "Vui lòng điền đầy đủ ngày/tháng/năm sinh";
          break;
        case 5:
          noti = "Vui lòng chọn giới tính";
          break;
        case 6:
          noti = "Vui lòng chọn vai trò";
          break;
        case 7:
          noti = "Mật khẩu xác nhận không trùng khớp";
          break;  
        case 8:
          noti = "Vui lòng xem điều khoản và đồng ý";
          break;
        case 9:
          noti = "Email đã tồn tại.";
          break; 
        default:
          check = true;
          break;
      }
    return [check, noti];
}

export function messageLogIn(type) {
  var noti = ""
  var check = false
  switch (type) {
      case 0:
        noti = "Vui lòng điền email";
        break;
      case 1:
        noti = "Vui lòng điền mật khẩu";
        break;
      case 2:
        noti = "Tài khoản hoặc mật khẩu không đúng";
        break;
      default:
        check = true;
        break;
    }
  return [check, noti];
}

