import React, { createContext, useState } from "react";
import {
  User,
  UserFormData,
  UserContextType,
  UserProviderProps,
} from "../types";

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [likedUsers, setLikedUsers] = useState<Set<number>>(new Set());

  const toggleLike = (userId: number): void => {
    setLikedUsers((prev) => {
      const newLiked = new Set(prev);
      if (newLiked.has(userId)) {
        newLiked.delete(userId);
      } else {
        newLiked.add(userId);
      }
      return newLiked;
    });
  };

  const deleteUser = (userId: number): void => {
    setUsers((prev) => prev.filter((user) => user.id !== userId));
    setLikedUsers((prev) => {
      const newLiked = new Set(prev);
      newLiked.delete(userId);
      return newLiked;
    });
  };

  const updateUser = (
    userId: number,
    updatedUser: Partial<UserFormData>
  ): void => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === userId ? { ...user, ...updatedUser } : user
      )
    );
  };

  const contextValue: UserContextType = {
    users,
    setUsers,
    loading,
    setLoading,
    likedUsers,
    toggleLike,
    deleteUser,
    updateUser,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
