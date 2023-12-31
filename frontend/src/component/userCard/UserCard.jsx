import Delete from "../../Icons/Delete";
import PropTypes from "prop-types";
import axios from "axios";
import { useContext } from "react";
import { TeamContext } from "../../context/TeamContext";
const UserCard = ({ user, users, setUsers }) => {
  const { id, first_name, last_name, avatar, email, domain, available } = user;
  const name = first_name.trim() + " " + last_name.trim();
  function handleDelete() {
    axios
      .delete(`/users/${id}`)
      .then((d) => {
        console.log(d.data);
        alert(`${name} deleted successful!`);
        setUsers(
          users.filter((user) => {
            return id !== user.id;
          })
        );
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
  const { teamMember, setTeamMember } = useContext(TeamContext);

  function handleTeamInsertion() {
    if (!teamMember.includes(user.id)) {
      setTeamMember(teamMember.concat(user.id));
    } else {
      setTeamMember(teamMember.filter((member) => member !== user.id));
    }
  }
  return (
    <tr className="userCard">
      <td>
        <img style={{ height: "100%" }} src={avatar} alt={name} />
        <div className="userDetails">
          <p>{name}</p>
          <p>{email}</p>
        </div>
      </td>
      <td>{email}</td>
      <td>{domain}</td>
      <td>{available ? "Yes" : "No"}</td>
      <td id="actionBtns">
        <button onClick={handleDelete}>
          <Delete />
        </button>
      </td>
      <td>
        <input type="checkbox" id="add2team" onClick={handleTeamInsertion} />
      </td>
    </tr>
  );
};

UserCard.propTypes = {
  user: PropTypes.shape({
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    domain: PropTypes.string.isRequired,
    available: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired,
  }),
  users: PropTypes.arrayOf(
    PropTypes.shape({
      first_name: PropTypes.string.isRequired,
      last_name: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      domain: PropTypes.string.isRequired,
      available: PropTypes.bool.isRequired,
      id: PropTypes.string.isRequired,
    })
  ),
  setUsers: PropTypes.func.isRequired,
};
export default UserCard;
