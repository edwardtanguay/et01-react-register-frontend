import { useState, useEffect } from 'react';
import axios from 'axios';
import { IUser } from '../interfaces';

interface IPageLoginProps {
	baseUrl: string;
	setCurrentUser: React.Dispatch<React.SetStateAction<IUser>>;
}

export const PageLogin = (props: IPageLoginProps) => {
	const { baseUrl, setCurrentUser } = props;
	const [formMessage, setFormMessage] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleLoginButton = (e: React.MouseEvent<HTMLElement>) => {
		e.preventDefault();
		(async () => {
			const data = (
				await axios.post(
					`${baseUrl}/login`,
					{ username },
					{ withCredentials: true }
				)
			).data;
			const _currentUser = data.currentUser;
			if (_currentUser.username === 'anonymousUser') {
				setFormMessage('bad login');
			} else {
				setCurrentUser(_currentUser);
				setFormMessage('');
				setUsername('');
				setPassword('');
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

				<div className="buttonRow">
					<div className="formMessage">{formMessage}</div>
					<button onClick={(e) => handleLoginButton(e)}>Login</button>
				</div>
			</fieldset>
		</form>
	);
};
