
import React from 'react';
import { FileUpload } from './FileUpload';
import { usersAPI } from '../../lib/apiClient';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'sonner';

export const ProfileImageUpload: React.FC = () => {
  const { user, updateUser } = useAuth();

  const handleImageUpload = async (file: File) => {
    try {
      toast.loading('Profil fotoğrafı yükleniyor...');
      const updatedUser = await usersAPI.uploadAvatar(file);
      updateUser(updatedUser);
      toast.dismiss();
      toast.success('Profil fotoğrafı güncellendi');
    } catch (error) {
      toast.dismiss();
      toast.error('Profil fotoğrafı yüklenemedi');
      console.error('Failed to upload profile image:', error);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Profil Fotoğrafı
      </label>
      <FileUpload
        onFileSelect={handleImageUpload}
        accept="image/*"
        maxSize={2}
        label="Fotoğraf yüklemek için tıklayın"
        currentFile={user?.avatar}
        preview={true}
      />
    </div>
  );
};
