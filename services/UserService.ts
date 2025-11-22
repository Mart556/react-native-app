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

	async saveUser(user: User): Promise<void> {
		try {
			const userString = JSON.stringify(user);
			await AsyncStorage.setItem(this.userKey, userString);
		} catch (error) {
			console.error("Error saving user:", error);
			throw error;
		}
	}
	async getUser(): Promise<User | null> {
		try {
			const userData = await AsyncStorage.getItem(this.userKey);

			if (!userData) {
				await new Promise((resolve) => setTimeout(resolve, 100));
				const retryData = await AsyncStorage.getItem(this.userKey);

				if (!retryData) {
					return null;
				}

				const parsedUser = JSON.parse(retryData);

				return parsedUser;
			}

			const parsedUser = JSON.parse(userData);

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
