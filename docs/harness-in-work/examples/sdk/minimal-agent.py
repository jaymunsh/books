"""
MarketFlow 최소 커스텀 에이전트 예시.

Claude Agent SDK(Anthropic Python SDK)의 tool runner를 사용한다.
tool runner는 "도구 정의 -> 모델 호출 -> 도구 실행 -> 결과 되먹임" 루프를
자동으로 돌려준다. 도구는 그냥 파이썬 함수이고, 독스트링과 타입 힌트에서
스키마가 자동 생성된다.

실행 전:
    pip install anthropic
    export ANTHROPIC_API_KEY="..."
    python minimal-agent.py
"""

import anthropic
from anthropic import beta_tool

client = anthropic.Anthropic()  # ANTHROPIC_API_KEY 환경변수를 사용


@beta_tool
def get_inventory(product_id: str) -> str:
    """상품 재고 수량을 조회한다.

    Args:
        product_id: 조회할 상품 ID (예: SKU-1234)
    """
    # 실제로는 사내 재고 DB를 조회한다. 여기서는 예시 값.
    fake_db = {"SKU-1234": "재고 42개, 창고 A", "SKU-9999": "품절"}
    return f"{product_id}: {fake_db.get(product_id, '조회되지 않음')}"


def main() -> None:
    runner = client.beta.messages.tool_runner(
        model="claude-opus-4-8",
        max_tokens=1024,
        tools=[get_inventory],
        messages=[{"role": "user", "content": "SKU-1234 재고 얼마나 있어?"}],
    )

    # 루프는 SDK가 자동으로 돈다. 각 반복은 하나의 메시지를 내놓는다.
    for message in runner:
        for block in message.content:
            if block.type == "text":
                print(block.text)


if __name__ == "__main__":
    main()
