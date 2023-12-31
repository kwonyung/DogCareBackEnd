import axios from "axios";
import { response } from "express";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UserEdit = () => {
  const navigation = useNavigate();

  const { id } = useParams();
  const [originalUserId, setOriginalUserId] = useState("");
  const [originalPassword, setOriginalPassword] = useState("");
  const [originalName, setOriginalName] = useState("");
  const [originalEmail, setOriginalEmail] = useState("");

  useEffect(() => {
    const token = localStorage.getItem('token');

    axios.get('/getMemberList', {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then(response => {
        const userData = response.data.find(user => user.id === id);
        if (userData) {
          setOriginalUserId(userData.account);
          setOriginalPassword(userData.password);
          setOriginalName(userData.name);
          setOriginalEmail(userData.email);
        }
      })
      .catch(error => {
        console.error(error);
      })
  }, [])

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const onUserIdHandler = (e) => {
    setUserId(e.target.value);
  }
  const onPasswordHandler = (e) => {
    setPassword(e.target.value);
  }
  const onNameHandler = (e) => {
    setName(e.target.value);
  }
  const onEmailHandler = (e) => {
    setEmail(e.target.value);
  }

  const onUserEditHandler = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    axios.put('/user/infoChange', {
      account: userId,
      password: password,
      name: name,
      email: email,
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then(response => {
        if (response.status === 200) {
          console.log("정보 수정");
          navigation('/userList');
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  return <div className="UserEdit">
    <div className="container">
      <div className="row">
        <div className="col-lg-3 col-md-2"></div>
        <div className="col-lg-6 col-md-8 edit-box">
          <div className="col-lg-12 login-form">
            <div className="col-lg-12 login-form">
              <form onSubmit={onUserEditHandler}>
                <div className="form-group">
                  <label className="form-control-label">아이디</label>
                  <input type="text" value={originalUserId} className="form-control" onChange={onUserIdHandler} />
                </div>
                <div className="form-group">
                  <label className="form-control-label">비밀번호</label>
                  <input type="password" value={originalPassword} className="form-control" onChange={onPasswordHandler} />
                </div>
                <div className="form-group">
                  <label className="form-control-label">이름</label>
                  <input type="text" value={originalName} className="form-control" onChange={onNameHandler} />
                </div>
                <div className="form-group">
                  <label className="form-control-label">이메일</label>
                  <input type="email" value={originalEmail} className="form-control" onChange={onEmailHandler} />
                </div>

                <div className="col-lg-12 loginbttm">
                  <div className="col-lg-6 login-btm login-text">
                  </div>
                  <div className="col-lg-6 login-btm login-button">
                    <button type="submit" className="btn btn-outline-primary">수정 완료</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="col-lg-3 col-md-2"></div>
        </div>
      </div>
    </div>
  </div>
};

export default UserEdit;