"""add cart_items table

Revision ID: b46ca74ae348
Revises: 1c49c7fa2cc5
Create Date: 2026-04-04 23:38:33.076398

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision: str = 'b46ca74ae348'
down_revision: Union[str, None] = '1c49c7fa2cc5'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table('cart_items',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('product_id', sa.Integer(), nullable=False),
    sa.Column('quantity', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['product_id'], ['products.id'], ondelete='CASCADE'),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('user_id', 'product_id', name='uq_cart_user_product')
    )


def downgrade() -> None:
    op.drop_table('cart_items')
               existing_server_default=sa.text('now()'))
    op.drop_table('cart_items')
    # ### end Alembic commands ###
