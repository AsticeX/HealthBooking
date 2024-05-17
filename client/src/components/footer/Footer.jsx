import "./footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="fLists">
      <ul className="fList">
          <li className="fListItem" style={{ fontSize: 18, color: "#000000", marginBottom: 24 }}>ที่อยู่</li>
          <li className="fListItem">9/1 หมู่ 5 ถนนพหลโยธิน ตำบลคลองหนึ่ง อำเภอคลองหลวง จังหวัดปทุมธานี 12120 </li>
          <li className="fListItem">ตำบลคลองหนึ่ง อำเภอคลองหลวง จังหวัดปทุมธานี</li>
          <li className="fListItem">รหัสไปรษณีย์ 12120 </li>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30965.86804881184!2d100.61150749986732!3d14.033804662417465!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e2801cc4ec2aff%3A0xbfec6d0816ab0b14!2sBangkok%20University!5e0!3m2!1sen!2sth!4v1715886205044!5m2!1sen!2sth"
            width="600"
            height="300"
            style={{ border: "0", allowfullscreen: "", loading: "lazy", referrerpolicy: "no-referrer-when-downgrade" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </ul>
        <ul className="fList">
          <li className="fListItem" style={{ fontSize: 18, color: "#000000", marginBottom: 24 }}>บริการของเรา</li>
          <li className="fListItem">จองคลินิค</li>
          <li className="fListItem">ค้นหาสถานบริการ</li>
          <li className="fListItem">คำนวณราคาวัคซีน</li>
          <li className="fListItem">ประวัติการรักษา</li>
        </ul>
        <ul className="fList">
          <li className="fListItem" style={{ fontSize: 18, color: "#000000", marginBottom: 24 }}>ติดต่อ</li>
          <li className="fListItem">FACEBOOK </li>
          <li className="fListItem">INSTRAGRAM </li>
          <li className="fListItem">TWITTER </li>
          <li className="fListItem">Healthbooking@gmail.com</li>
        </ul>
        {/* <ul className="fList">
          <li className="fListItem" style={{ fontSize: 18, color: "#000000", marginBottom: 24 }}>บริการของเรา</li>
          <li className="fListItem">TEST </li>
          <li className="fListItem">TEST</li>
          <li className="fListItem">TEST</li>
          <li className="fListItem">TEST</li>
          <li className="fListItem">TEST </li>
        </ul>
        */}

      </div>
      <div className="fText" style={{ display: "flex", justifyContent: "center"}}>Copyright ©  HealthBooking.</div>
    </div>
  );
};

export default Footer;
