import { useState, useEffect } from 'react';
import axios from 'axios';

interface IPageLoginProps {
	baseUrl: string;
}

export const PageLogin = (props:IPageLoginProps) => {
	const { baseUrl } = props;
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleLoginButton = (e: React.MouseEvent<HTMLElement>) => {
		e.preventDefault();
		// (async () => {
		// 	const data = (await axios.get(`${baseUrl}/current-user`)).data;
		// 	const _currentUser = data.currentUser;
		// 	setCurrentUser(_currentUser);
		// })();
	}

	return (
		<form>
			<h1>{baseUrl}</h1>
			<fieldset>
				<div className="row">
					<label>Username</label>
					<div>
						<input autoFocus type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
					</div>
				</div>

				<div className="row">
					<label>Password</label>
					<div>
						<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
					</div>
				</div>

				<div className="buttonRow">
					<button onClick={(e:React.MouseEvent<HTMLElement>) => handleLoginButton(e)}>Login</button>
				</div>
			</fieldset>
		</form>
	);
};