import { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { FC } from 'react';
import '../../css/icon.css';
import '../../css/welcome.css';
import FlareIcon from '@/Components/FlareIcon';
import Card from '@/Components/Card';
import CenteringContainer from '@/Components/CenteringContainer';

const Welcome: FC<PageProps<{ laravelVersion: string; phpVersion: string }>> = ({
  auth,
  laravelVersion,
  phpVersion,
}) => {
  return (
    <>
      <Head title="Flare" />
        <CenteringContainer>
        <FlareIcon />
        <Card title='Flare'>
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
        </Card>
        </CenteringContainer>
    </>
  );
};

export default Welcome;
