import React, { useEffect } from "react";
import { LoadingSpinner } from "./components/common";
import { UserCard } from "./components/UserCard";
import { useUserContext } from "./hooks";
import { USERS_ENDPOINT } from "./utils";
import { User } from "./types";

const App: React.FC = () => {
  const { users, setUsers, loading, setLoading } = useUserContext();

  useEffect(() => {
    const fetchUsers = async (): Promise<void> => {
      try {
        setLoading(true);
        const response = await fetch(USERS_ENDPOINT);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const userData: User[] = await response.json();
        setUsers(userData);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [setUsers, setLoading]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-5xl mx-auto px-4 py-8">
        {users.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No users found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {users.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
