import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { supabase } from "../../lib/supabaseClient";
import { toast } from "sonner";

const ProfileImageUpload: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) return;

    const file = event.target.files[0];
    const fileExt = file.name.split(".").pop();
    const fileName = `${user?.id}.${fileExt}`;
    const filePath = `avatars/${fileName}`;

    setUploading(true);

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, file, { upsert: true });

    if (uploadError) {
      toast.error("Yükleme başarısız: " + uploadError.message);
      setUploading(false);
      return;
    }

    const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);
    updateUser({ ...user!, avatar: data.publicUrl });

    toast.success("Profil fotoğrafı güncellendi!");
    setUploading(false);
  };

  return (
    <div>
      <img
        src={user?.avatar || "/placeholder.png"}
        alt="Profil"
        className="w-24 h-24 rounded-full"
      />
      <input type="file" onChange={handleUpload} disabled={uploading} />
    </div>
  );
};

export default ProfileImageUpload;
