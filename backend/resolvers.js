const axios = require("axios");

const resolvers = {
  Query: {
    users: async (_, { search, sortBy, sortOrder }) => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        let users = response.data;

        if (search) {
          users = users.filter((user) => {
            const { name, username, email, phone, website, company } = user;
            return (
              name.toLowerCase().includes(search.toLowerCase()) ||
              username.toLowerCase().includes(search.toLowerCase()) ||
              email.toLowerCase().includes(search.toLowerCase()) ||
              phone.includes(search) ||
              website.toLowerCase().includes(search.toLowerCase()) ||
              company.name.toLowerCase().includes(search.toLowerCase())
            );
          });
        }

        if (sortBy) {
          users = users.sort((a, b) => {
            if (sortOrder === "desc") {
              return a[sortBy] > b[sortBy] ? -1 : 1;
            }
            return a[sortBy] > b[sortBy] ? 1 : -1;
          });
        }

        return users;
      } catch (error) {
        console.error("Error fetching users:", error);
        throw new Error("Failed to fetch users");
      }
    },
  },
};

module.exports = resolvers;
