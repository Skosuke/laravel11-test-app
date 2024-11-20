import { PageProps } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import { FC, FormEventHandler } from 'react';
import '../../../css/icon.css';
import '../../../css/register.css';
import FlareIcon from '@/Components/FlareIcon';
import Card from '@/Components/Card';
import CenteringContainer from '@/Components/CenteringContainer';

const Register: FC<PageProps> = () => {
  const { data, setData, post, processing, errors, reset } = useForm<{
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
  }>({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    Inertia.post(route('register'), data, {
      onFinish: () => reset('password', 'password_confirmation'),
    });
  };

  return (
    <>
      <Head title="Register" />
      <CenteringContainer>
        <FlareIcon />
        <Card title="Create Your Account">
          <p className="card-subtitle">
            Join our community and start connecting today.
          </p>
          <form onSubmit={submit} className="register-form">
            {(
              ['name', 'email', 'password', 'password_confirmation'] as const
            ).map((field) => (
              <div key={field} className="form-control">
                <label htmlFor={field} className="form-label">
                  {capitalizeFirstLetter(field.replace('_', ' '))}
                </label>
                <input
                  id={field}
                  name={field}
                  type={field.includes('password') ? 'password' : 'text'}
                  value={data[field]}
                  onChange={(e) =>
                    setData(field, e.currentTarget.value as string)
                  }
                  required
                  className="form-input"
                  placeholder={`Enter your ${field.replace('_', ' ')}`}
                />
                {errors[field] && (
                  <div className="error-message">{errors[field]}</div>
                )}
              </div>
            ))}
            <div className="form-actions">
              <button
                type="submit"
                className="submit-button"
                disabled={processing}
              >
                {processing ? 'Registering...' : 'Register'}
              </button>
            </div>
            <div className="already-registered">
              <p>Already have an account?</p>
              <Link href={route('login')} className="login-link">
                Log in here
              </Link>
            </div>
          </form>
        </Card>
      </CenteringContainer>
    </>
  );
};

const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export default Register;
