<div class="sub">
    <h2>Login</h2>
    <p>
        <span class="icon">
            <ion-icon name="person"></ion-icon>
        </span>
        <input type="text" name="username" required /><br>
        <label for="username">Username</label><br>
        <span class="icon">
            <ion-icon name="lock-closed"></ion-icon>
        </span>
        <input type="password" name="userkey" required /> <br>
        <label for="userkey">Password</label> <br>
        <input type="checkbox" name="rememberLogin">
        <label for="rememberLogin">Remember me</label>
    </p>
    <p>
        <button type="submit" class="btn">Login</button>
    </p>
    <p>
        <button on:click={test = "a"}>Forgot Password?</button>
    </p>
</div>
<div class="sub">
    <h2>Registration</h2>
    <form action="#">
        <div class="input-box">
            <span class="icon">
                <ion-icon name="person"></ion-icon>
            </span>
            <input type="text" required />
            <label>Username</label>
        </div>
        <div class="input-box">
            <span class="icon">
                <ion-icon name="mail"></ion-icon>
            </span>
            <input type="email" required />
            <label>Email</label>
        </div>
        <div class="input-box">
            <span class="icon">
                <ion-icon name="lock-closed"></ion-icon>
            </span>
            <input type="password" required />
            <label>Password</label>
        </div>
        <div class="remember-forgot">
            <label
                ><input type="checkbox" /> I agree to the terms & conditions</label
            >
        </div>
        <button type="submit" class="btn">Register</button>
        <div class="login-register">
            <p>
                Already have an account? <a href="#" class="login-link">Login</a
                >
            </p>
        </div>
    </form>
</div>