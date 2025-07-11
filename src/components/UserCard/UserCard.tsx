import React, { useState } from "react";
import { Trash2, Edit, Heart, Mail, Phone, Globe } from "lucide-react";
import { UserCardProps, UserFormData } from "../../types";
import { useUserContext } from "../../hooks";
import { getAvatarUrl, FALLBACK_AVATAR } from "../../utils";
import { EditModal, DeleteConfirmModal } from "../modals";

export const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const { likedUsers, toggleLike, deleteUser, updateUser } = useUserContext();
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);

  const isLiked: boolean = likedUsers.has(user.id);
  const avatarUrl: string = getAvatarUrl(user.username);

  const handleEdit = () => {
    setEditModalOpen(true);
  };

  const handleDelete = () => {
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    deleteUser(user.id);
    setDeleteModalOpen(false);
  };

  const handleSaveEdit = (updatedData: UserFormData) => {
    updateUser(user.id, updatedData);
  };

  const handleImageError = (e: React.ChangeEvent<HTMLImageElement>) => {
    e.target.src = FALLBACK_AVATAR;
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
        <div className="flex flex-col items-center bg-[#F5F5F5]">
          <img
            src={avatarUrl}
            alt={`${user.name}'s avatar`}
            className="w-28"
            onError={handleImageError}
          />
        </div>

        <div className="space-y-1 text-xs text-gray-600 py-3 px-5">
          <h3 className="text-sm font-semibold text-gray-800 text-start">
            {user.name}
          </h3>
          <div className="flex items-center gap-x-2">
            <Mail size={15} className="mr-2 text-gray-500" />
            <span className="truncate">{user.email}</span>
          </div>
          <div className="flex items-center gap-x-2">
            <Phone size={15} className="mr-2 text-gray-500" />
            <span className="truncate">{user.phone}</span>
          </div>
          <div className="flex items-center gap-x-2">
            <Globe size={15} className="mr-2 text-gray-500" />
            <a
              href={`https://${user.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 truncate"
            >
              {user.website}
            </a>
          </div>
        </div>

        <div className="flex justify-between p-[0.35rem] bg-[#f5f5f5]">
          <div className="flex-1 justify-center items-center flex">
            <button
              onClick={() => toggleLike(user.id)}
              className={`p-2 rounded-full transition-colors ${
                isLiked
                  ? "bg-red-100 text-red-600 hover:bg-red-200"
                  : "bg-gray-200 text-gray-600 hover:bg-gray-300"
              }`}
              type="button"
              title={isLiked ? "Unlike" : "Like"}
            >
              <Heart size={15} className={isLiked ? "fill-current" : ""} />
            </button>
          </div>
          <div className="flex-1 justify-center items-center flex">
            <button
              onClick={handleEdit}
              className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
              type="button"
              title="Edit"
            >
              <Edit size={15} />
            </button>
          </div>
          <div className="flex-1 justify-center items-center flex">
            <button
              onClick={handleDelete}
              className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
              type="button"
              title="Delete"
            >
              <Trash2 size={15} />
            </button>
          </div>
        </div>
      </div>

      <EditModal
        user={user}
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        onSave={handleSaveEdit}
      />

      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        userName={user.name}
      />
    </>
  );
};
