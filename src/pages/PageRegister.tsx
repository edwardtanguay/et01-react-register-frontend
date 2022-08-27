import { useState } from 'react';
import axios from 'axios';
import { IUser } from '../interfaces';
import { useNavigate } from 'react-router-dom';

interface IPageRegisterProps {
	baseUrl: string;
	setCurrentUser: React.Dispatch<React.SetStateAction<IUser>>;
}

export const PageRegister = (props: IPageRegisterProps) => {
	const { baseUrl, setCurrentUser } = props;
	const [formMessage, setFormMessage] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');

	const navigate = useNavigate();

	const handleRegisterButton = (e: React.MouseEvent<HTMLElement>) => {
		e.preventDefault();
		(async () => {
			const data = (
				await axios.post(
					`${baseUrl}/register`,
					{ username, password, firstName, lastName, email},
					{ withCredentials: true }
				)
			).data;
			const _currentUser = data.currentUser;
			if (_currentUser.username === 'anonymousUser') {
				setFormMessage('');
				setUsername('');
				setPassword('');
				setFirstName('');
				setLastName('');
				setEmail('');
				navigate('/login');
			}
		})();
	};

	return (
		<form>
			<fieldset>
				<div className="row">
					<label>Username</label>
					<div>
						<input
							autoFocus
							type="text"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
					</div>
				</div>

				<div className="row">
					<label>Password</label>
					<div>
						<input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
				</div>

				<div className="row">
					<label>First Name</label>
					<div>
						<input
							type="text"
							value={firstName}
							onChange={(e) => setFirstName(e.target.value)}
						/>
					</div>
				</div>

				<div className="row">
					<label>Last Name</label>
					<div>
						<input
							type="text"
							value={lastName}
							onChange={(e) => setLastName(e.target.value)}
						/>
					</div>
				</div>

				<div className="row">
					<label>Email</label>
					<div>
						<input
							type="text"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
				</div>

				<div className="buttonRow">
					<div className="formMessage">{formMessage}</div>
					<button onClick={(e) => handleRegisterButton(e)}>Login</button>
				</div>
			</fieldset>
		</form>
	);
};