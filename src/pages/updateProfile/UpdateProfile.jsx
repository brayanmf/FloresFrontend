import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import Alert from "../../components/alert/Alert";
import Loader from "../../components/loader/Loader";
import {
	clearErrorAction,
	profileReset,
} from "../../store/profileReducer/profileReducer.reducer";
import {updateProfile} from "../../store/profileReducer/profileReducer.action";
import {loadUser} from "../../store/authReducer/authReducer.action";

const UpdateProfile = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const {user} = useSelector((state) => state.auth);
	const {error, isUpdate, loading} = useSelector((state) => state.profile);
	const [name, setName] = useState(user.name);
	const [email, setEmail] = useState(user.email);
	const [avatar, setAvatar] = useState();
	const [avatarPreview, setAvatarPreview] = useState(user.avatar.url);
	const [bolError, setBolError] = useState(false);

	const updateSubmit = (e) => {
		e.preventDefault();
		const myForm = new FormData();
		myForm.set("name", name);
		myForm.set("email", email);
		myForm.set("avatar", avatar);
		dispatch(updateProfile(myForm));
	};
	const updateDataChange = (e) => {
		const reader = new FileReader();
		reader.onload = () => {
			if (reader.readyState === 2) {
				setAvatarPreview(reader.result); // for preview html
				setAvatar(e.target.files[0]);
			}
		};
		reader.readAsDataURL(e.target.files[0]); // for preview html
	};
	useEffect(() => {
		if (user) {
			setName(user.name);
			setEmail(user.email);
			setAvatarPreview(user.avatar.url);
		}
		if (error) {
			setBolError(true);
			setTimeout(() => {
				setBolError(false);
				dispatch(clearErrorAction());
			}, 2500);
		}
		if (isUpdate) {
			dispatch(loadUser());
			navigate("/profile");
			dispatch(profileReset());
		}
	}, [user, dispatch, isUpdate]);

	return (
		<div className="min-h-screen">
			{bolError && (
				<Alert
					type="alert-error"
					styleAlert="absolute  w-1/4 mt-20 top-0 right-0  "
					message={error}
				/>
			)}
			<div className="card-body w-96 m-20  mx-auto shadow-2xl  ">
				<h2 className="font-bold text-center p-5">Actualizar Perfil</h2>

				{loading ? (
					<Loader styleLoader="absolute  inset-2/4" />
				) : (
					<form encType="multipart/form-data" onSubmit={updateSubmit}>
						<div className="form-control">
							<label className="label">
								<span className="label-text font-bold">Nombre</span>
							</label>
							<input
								type="text"
								className="input input-bordered"
								name="name"
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
						</div>
						<div className="form-control">
							<label className="label">
								<span className="label-text font-bold">Correo</span>
							</label>
							<input
								type="email"
								className="input input-bordered"
								name="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<div className="form-control">
							<label className="label">
								<span className="label-text font-bold">Perfil</span>
							</label>
							<div className="avatar">
								<div className="w-24 mask mask-hexagon mx-auto ">
									<img src={avatarPreview} alt="avatar profile" />
								</div>
							</div>
							<input
								type="file"
								name="avatar"
								accept="image/*"
								className="input input-bordered"
								onChange={updateDataChange}
							/>
						</div>
						<div className="form-control mt-6">
							<button type="submit" className="btn btn-primary">
								Actualizar
							</button>
						</div>
					</form>
				)}
			</div>
		</div>
	);
};

export default UpdateProfile;
