import { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { FC } from 'react';
import '../../css/icon.css';
import '../../css/welcome.css';
import FlareIcon from '@/Components/FlareIcon';

const Welcome: FC<PageProps<{ laravelVersion: string; phpVersion: string }>> = ({
  auth,
  laravelVersion,
  phpVersion,
}) => {
  return (
    <>
      <Head title="Flare" />
      <div className="centered-container">
        <FlareIcon />
        <div className="card-wrapper">
          <div className="card-body">
            <h1 className="card-title">Flare</h1>
            <p className="card-subtitle">Explore flare communities and connect with others.</p>
            <div className="button-group">
              <Link href="/login">
                <button className="primary-button">
                  Login
                </button>
              </Link>
              <Link href="/register">
                <button className="secondary-button">
                  Register
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Welcome;
