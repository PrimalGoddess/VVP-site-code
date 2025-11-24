# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.





## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { createUser, getUserByEmail, createSession, deleteSession } from '@dataconnect/generated';


// Operation CreateUser:  For variables, look at type CreateUserVars in ../index.d.ts
const { data } = await CreateUser(dataConnect, createUserVars);

// Operation GetUserByEmail:  For variables, look at type GetUserByEmailVars in ../index.d.ts
const { data } = await GetUserByEmail(dataConnect, getUserByEmailVars);

// Operation CreateSession:  For variables, look at type CreateSessionVars in ../index.d.ts
const { data } = await CreateSession(dataConnect, createSessionVars);

// Operation DeleteSession:  For variables, look at type DeleteSessionVars in ../index.d.ts
const { data } = await DeleteSession(dataConnect, deleteSessionVars);


```