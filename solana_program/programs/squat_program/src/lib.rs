use anchor_lang::prelude::*;

declare_id!("GeocQpFKsAU5g8nu59eFy9soa2kERftM4qfGFcToR6Vd");

#[program]
pub mod squat_program {
    use super::*;

    /// ✅ 온체인에 Squat 기록 저장 함수
    pub fn record_squat(ctx: Context<RecordSquat>, count: u32) -> Result<()> {
        let squat_data = &mut ctx.accounts.squat_data;
        squat_data.count += count;
        msg!("✅ Squat 기록 저장 완료: {}", squat_data.count);
        Ok(())
    }
}

/// ✅ RecordSquat 컨텍스트 (계정 설정)
#[derive(Accounts)]
pub struct RecordSquat<'info> {
    #[account(
        init_if_needed,
        payer = user,
        space = 8 + 8,  // 기본 계정 크기 설정
        seeds = [b"squat", user.key().as_ref()], // ✅ PDA(Program Derived Address) 사용
        bump
    )]
    pub squat_data: Account<'info, SquatData>,
    
    #[account(mut)]
    pub user: Signer<'info>, // 서명자 (트랜잭션을 보낼 사용자)

    pub system_program: Program<'info, System>, // Solana 시스템 프로그램
}

/// ✅ Squat 데이터 저장 구조체
#[account]
pub struct SquatData {
    pub count: u32, // ✅ 저장된 스쿼트 횟수
    pub bump: u8,   // ✅ PDA bump 값
}
