import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler, useEffect } from 'react';
import '../../../css/icon.css';
import '../../../css/login.css';
import FlareIcon from '@/Components/FlareIcon';

const Login = ({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title="Log in" />
            <div className="centered-container">
                <FlareIcon />
                <div className="card-wrapper">
                    <div className="card-body">
                        <h2 className="card-title">Log in to Flare</h2>
                        {status && (
                            <div className="status-message">{status}</div>
                        )}
                        <form onSubmit={submit} className="login-form">
                            <div className="form-control">
                                <InputLabel htmlFor="email" value="Email" className="form-label" />
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="form-input"
                                    autoComplete="username"
                                    isFocused={true}
                                    onChange={(e) => setData('email', e.target.value)}
                                />
                                <InputError message={errors.email} className="error-message" />
                            </div>

                            <div className="form-control">
                                <InputLabel htmlFor="password" value="Password" className="form-label" />
                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="form-input"
                                    autoComplete="current-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                />
                                <InputError message={errors.password} className="error-message" />
                            </div>

                            <div className="remember-me-container">
                                <label className="remember-me-label">
                                    <Checkbox
                                        name="remember"
                                        checked={data.remember}
                                        onChange={(e) => setData('remember', e.target.checked)}
                                    />
                                    <span className="remember-me-text">Remember me</span>
                                </label>
                            </div>

                            <div className="form-actions">
                                {canResetPassword && (
                                    <Link href={route('password.request')} className="forgot-password-link">
                                        Forgot your password?
                                    </Link>
                                )}
                                <PrimaryButton className="submit-button" disabled={processing}>
                                    {processing ? 'Logging in...' : 'Log in'}
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Login;