const makeAuthenticatedRequest = async () => {
    const jwtToken = localStorage.getItem('jwtToken');
  
    if (!jwtToken) {
      // 沒有 JWT，可能用戶還未登入或 JWT 過期，導向登入頁面
      return;
    }
  
    // 使用 JWT 發送請求
    try {
      const response = await fetch('/api/protected', {
        headers: {
          'Authorization': `Bearer ${jwtToken}`,
        },
      });
  
      if (response.ok) {
        // 請求成功處理
        const responseData = await response.json();
        console.log('請求成功', responseData);
      } else if (response.status === 401) {
        // JWT 過期，使用 Refresh Token 獲取新的 JWT
        const refreshToken = localStorage.getItem('refreshToken');
  
        if (refreshToken) {
          const refreshResponse = await fetch('/api/refresh', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refreshToken }),
          });
  
          if (refreshResponse.ok) {
            const { token } = await refreshResponse.json();
            localStorage.setItem('jwtToken', token);
            // 使用新的 JWT 重新發送請求
            await makeAuthenticatedRequest();
          } else {
            // Refresh Token 無效或過期，導向登入頁面
            console.error('Refresh Token 無效或過期，需要重新登入');
          }
        } else {
          // 無法獲取新的 JWT，導向登入頁面
          console.error('需要重新登入');
        }
      } else {
        // 其他錯誤處理
        console.error('請求失敗');
      }
    } catch (error) {
      console.error('發生錯誤', error);
    }
  };

  export default makeAuthenticatedRequest;