import { ProfileForm } from '@/features/profile/components/ProfileForm';
import { useUserProfileContext } from '@/features/user/contexts/UserProfileContext';

export default function EditProfileScreen() {
  const { data, userId, refetch } = useUserProfileContext();

  if (!userId || !data) {
    return null;
  }

  const handleProfileUpdate = () => {
    refetch();
  };

  return (
    <ProfileForm
      userId={userId}
      email={data.email}
      username={data.username}
      bio={data.bio}
      onProfileUpdate={handleProfileUpdate}
    />
  );
}
