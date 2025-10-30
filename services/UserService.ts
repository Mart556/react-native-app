import AsyncStorage from "@react-native-async-storage/async-storage";

export type GitHubUser = {
	login: string;
	name: string | null;
	email: string | null;
	avatar_url: string;
	bio: string | null;
	location: string | null;
	public_repos: number;
	followers: number;
	following: number;
};

export type User = {
	username: string;
	name: string;
	email: string;
	avatar: string;
	isAuthenticated: boolean;
};

class UserService {
	private static instance: UserService;
	private userKey = "app_user";

	static getInstance(): UserService {
		if (!UserService.instance) {
			UserService.instance = new UserService();
		}
		return UserService.instance;
	}

	// Save user data after successful authentication
	async saveUser(user: User): Promise<void> {
		try {
			const userString = JSON.stringify(user);
			console.log("Attempting to save user:", userString);
			console.log("Storage key:", this.userKey);

			await AsyncStorage.setItem(this.userKey, userString);

			// List all keys after save
			const allKeys = await AsyncStorage.getAllKeys();
			console.log("All keys after save:", allKeys);

			// Immediately verify the save
			const verification = await AsyncStorage.getItem(this.userKey);
			console.log("Immediate verification after save:", verification);
			console.log("Save successful:", verification === userString);
		} catch (error) {
			console.error("Error saving user:", error);
			throw error;
		}
	} // Get current user
	async getUser(): Promise<User | null> {
		try {
			console.log("Getting user with key:", this.userKey);

			// Debug: List all keys in AsyncStorage
			const allKeys = await AsyncStorage.getAllKeys();
			console.log("All AsyncStorage keys:", allKeys);

			const userData = await AsyncStorage.getItem(this.userKey);
			console.log("Retrieved raw data:", userData);

			if (!userData) {
				console.log("No user data found in storage");
				// Try to get with a slight delay in case of timing issue
				await new Promise((resolve) => setTimeout(resolve, 100));
				const retryData = await AsyncStorage.getItem(this.userKey);
				console.log("Retry retrieved data:", retryData);

				if (!retryData) {
					return null;
				}

				const parsedUser = JSON.parse(retryData);
				console.log("Parsed user (retry):", parsedUser);
				return parsedUser;
			}

			const parsedUser = JSON.parse(userData);
			console.log("Parsed user:", parsedUser);
			return parsedUser;
		} catch (error) {
			console.error("Error getting user:", error);
			return null;
		}
	} // Check if user is authenticated
	async isAuthenticated(): Promise<boolean> {
		try {
			const user = await this.getUser();
			return user?.isAuthenticated || false;
		} catch (error) {
			console.error("Error checking authentication:", error);
			return false;
		}
	}

	// Logout user
	async logout(): Promise<void> {
		try {
			await AsyncStorage.removeItem(this.userKey);
		} catch (error) {
			console.error("Error logging out:", error);
			throw error;
		}
	}

	// Fetch GitHub user data using access token
	async fetchGitHubUser(accessToken: string): Promise<GitHubUser> {
		try {
			const response = await fetch("https://api.github.com/user", {
				headers: {
					Authorization: `Bearer ${accessToken}`,
					Accept: "application/vnd.github.v3+json",
				},
			});

			if (!response.ok) {
				throw new Error(`GitHub API error: ${response.status}`);
			}

			const userData: GitHubUser = await response.json();
			console.log("Fetched GitHub user data:", userData);
			// GitHub might not return email in the main endpoint, fetch it separately
			if (!userData.email) {
				const emailResponse = await fetch(
					"https://api.github.com/user/emails",
					{
						headers: {
							Authorization: `Bearer ${accessToken}`,
							Accept: "application/vnd.github.v3+json",
						},
					}
				);

				if (emailResponse.ok) {
					const emails: {
						email: string;
						primary: boolean;
						verified: boolean;
					}[] = await emailResponse.json();
					const primaryEmail = emails.find((e) => e.primary && e.verified);
					if (primaryEmail) {
						userData.email = primaryEmail.email;
					}
				}
			}

			return userData;
		} catch (error) {
			console.error("Error fetching GitHub user:", error);
			throw error;
		}
	}

	// Convert GitHub user to app user format
	convertGitHubUser(githubUser: GitHubUser): User {
		return {
			username: githubUser.login,
			name: githubUser.name || githubUser.login,
			email: githubUser.email || "No email provided",
			avatar: githubUser.avatar_url,
			isAuthenticated: true,
		};
	}
}

export default UserService.getInstance();
